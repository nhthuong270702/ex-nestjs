import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { events } from '../../../common/constants/event.constants';
import { ResponseAdd } from '../events/response-add.event';
import { QuizService } from '../services/quiz.service';

@Controller('response')
@ApiTags('Response')
export class ResponseController {
  constructor(
    private eventEmitter: EventEmitter2,
    private quizService: QuizService,
  ) {}

  @Post('')
  async handleQuestionResponse() {
    console.log('This is inside the controller');

    const payload = new ResponseAdd();
    payload.userId = 8;
    payload.optionId = 6;

    this.eventEmitter.emit(events.RESPONSE_SUBMITTED, payload);

    return { message: 'Response taken' };
  }
}
