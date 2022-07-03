import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard } from '../../auth/admin-role.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('quiz')
@ApiTags('quiz')
@ApiSecurity('bearer')
@Roles('admin')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/')
  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizService.getAllQuiz();
  }

  @Get('/:id')
  getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findQuizById(id);
  }

  @Get('/count')
  countAllQuiz() {
    return this.quizService.countAllQuiz();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createQuiz(createQuizDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async editQuiz(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return await this.quizService.editQuiz(id, createQuizDto);
  }

  @Delete('/:id')
  async deleteQuiz(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.deleteQuiz(id);
  }
}
