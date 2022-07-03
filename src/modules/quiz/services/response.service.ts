import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from '../../../common/constants/event.constants';
import { ResponseAdd } from '../events/response-add.event';
import { OptionService } from './option.service';

@Injectable()
export class ResponseService {
  constructor(private optionService: OptionService) {}
  @OnEvent(events.RESPONSE_SUBMITTED)
  handleIfResponseIsCorrect(payload: ResponseAdd) {
    console.log('handleIfResponseIsCorrect', payload);
  }
}
