import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, OneToMany } from "typeorm";
import { Question } from './question.entity';


@Entity('quizes')
export class Quiz extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    title: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type: 'boolean',
        default: 1,
    })
    isActive: boolean;

    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[]
}
