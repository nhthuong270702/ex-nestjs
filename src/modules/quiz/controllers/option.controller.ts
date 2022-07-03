import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { CreateOptionDto } from '../dto/create-option.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('question/option')
@ApiTags('option')
export class OptionController {

    constructor(private optionService: OptionService, private questionService: QuestionService) { }

    @Post('')
    @UsePipes(ValidationPipe)
    async createOption(@Body() createOptionDto: CreateOptionDto) {
        const question = await this.questionService.findQuestion(createOptionDto.questionId);
        const newOption = await this.optionService.createOption(createOptionDto, question);
        return { question, newOption };
    }
}
