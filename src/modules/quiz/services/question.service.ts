import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';


@Injectable()
export class QuestionService {

    constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>) { }

    async getAllQuestion() {
        return await this.questionRepository.find();
    }

    async findQuestion(id) {
        return await this.questionRepository.findOne({
            where: {
                id
            }, relations: ['quiz', 'options']
        })
    }

    async createQuestion(createQuestionDto, quiz: Quiz): Promise<Question> {
        const newQuestion = await this.questionRepository.save({
            question: createQuestionDto.question,
        });

        quiz.questions = [...quiz.questions, newQuestion];
        await quiz.save();

        return newQuestion;
    }

    updateQuestion(id, createQuestionDto) {
        return this.questionRepository.update(id, createQuestionDto);
    }

    deleteQuestion(id) {
        return this.questionRepository.delete(id);
    }
}
