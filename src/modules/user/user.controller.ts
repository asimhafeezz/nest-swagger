import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEventShiftDto, CreateUserDto, CreateUserShiftRequestDto, UpdateUserShiftRequestDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('event-shift')
  createEventShift(@Body() createEventShiftDto: CreateEventShiftDto) {
    return this.userService.createEventShift(createEventShiftDto);
  }

  @Post('request-shift')
  createUserShiftRequest(@Body() createUserShiftRequestDto: CreateUserShiftRequestDto) {
    return this.userService.createUserShiftRequest(createUserShiftRequestDto);
  }

  // // update request status
  @Post('update-request')
  updateUserShiftRequest(@Body() updateUserShiftRequestDto: UpdateUserShiftRequestDto) {
    return this.userService.updateUserShiftRequestStatus(updateUserShiftRequestDto);
  }

}
