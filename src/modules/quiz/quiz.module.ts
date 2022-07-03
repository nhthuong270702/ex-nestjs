import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './services/quiz.service';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { Question } from './entities/question.entity';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { Option } from './entities/option.entity';
import { UserModule } from '../user/user.module';
import { ResponseController } from './controllers/response.controller';
import { ResponseService } from './services/response.service';

@Module({
  controllers: [
    QuizController,
    QuestionController,
    OptionController,
    ResponseController,
  ],
  providers: [QuizService, QuestionService, OptionService, ResponseService],
  //them vao
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option]), UserModule],
})
export class QuizModule {}
