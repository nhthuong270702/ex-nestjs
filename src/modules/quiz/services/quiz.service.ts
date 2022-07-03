import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Question } from '../entities/question.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from '../../../common/constants/event.constants';
import { ResponseAdd } from '../events/response-add.event';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuiz() {
    return await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect('question.options', 'option')
      .getMany();
  }

  async findQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id,
      },
      relations: ['questions', 'questions.options'],
    });
  }

  countAllQuiz() {
    return this.quizRepository.count();
  }

  async createQuiz(createQuiz: CreateQuizDto) {
    return await this.quizRepository.save(createQuiz);
  }

  async editQuiz(id: number, createQuizDto: CreateQuizDto) {
    return await this.quizRepository.update(id, createQuizDto);
  }

  async deleteQuiz(id: number) {
    return this.quizRepository.delete(id);
  }

  @OnEvent(events.RESPONSE_SUBMITTED)
  checkQuizCompeleted(payload: ResponseAdd) {
    console.log('checkQuizCompeleted', payload);
  }
}
