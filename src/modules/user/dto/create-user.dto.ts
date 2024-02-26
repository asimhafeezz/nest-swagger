import { ApiProperty } from "@nestjs/swagger";
import { USER_SHIFT_STATUS } from "src/entities";

export class CreateUserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: number;

  @ApiProperty()
  email: string;
}

export class CreateEventShiftDto {
  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  name: string;
}

export class CreateUserShiftRequestDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  eventShiftId: string;

  @ApiProperty({ enum: USER_SHIFT_STATUS })
  status?: USER_SHIFT_STATUS;
}

export class CreateUserShiftDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  eventShiftId: string;
}

// updateUserShiftRequestStatus
export class UpdateUserShiftRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: USER_SHIFT_STATUS })
  status: USER_SHIFT_STATUS;
}
