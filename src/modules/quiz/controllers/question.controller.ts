import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard } from '../../auth/admin-role.guard';

@Controller('question')
@ApiTags('question')
@ApiSecurity('bearer')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}

  @Get('/')
  @UseGuards(AdminRoleGuard)
  getAllQuestion() {
    const questions = this.questionService.getAllQuestion();
    return questions;
  }

  @Get('/:id')
  findQuestion(@Param('id', ParseIntPipe) id: number) {
    const question = this.questionService.findQuestion(id);
    if (!question) {
      throw new HttpException('No question found.', 404);
    } else {
      return question;
    }
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AdminRoleGuard)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    const quiz = await this.quizService.findQuizById(createQuestionDto.quizId);
    return await this.questionService.createQuestion(createQuestionDto, quiz);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.updateQuestion(id, createQuestionDto);
  }

  @Delete('/:id')
  deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.deleteQuestion(id);
  }
}
