import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '../entities/option.entity';
import { Question } from '../entities/question.entity';
import { CreateOptionDto } from '../dto/create-option.dto';

@Injectable()
export class OptionService {

    constructor(@InjectRepository(Option) private readonly optionRepository: Repository<Option>) { }

    async createOption(optionData: CreateOptionDto, question: Question): Promise<Option> {

        const newOption = await this.optionRepository.save({

            text: optionData.text,

            isCorrect: optionData.isCorrect

        });

        question.options = [...question.options, newOption];

        await question.save();

        return newOption;

    }
}
