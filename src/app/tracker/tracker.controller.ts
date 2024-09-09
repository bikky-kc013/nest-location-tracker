import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class TrackerController {
  @Get()
  @Render('map')
  getMap() {
  }
}
