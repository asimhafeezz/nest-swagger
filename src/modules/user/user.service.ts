import { Injectable } from "@nestjs/common";
import {
  CreateEventShiftDto,
  CreateUserDto,
  CreateUserShiftRequestDto,
  UpdateUserShiftRequestDto,
} from "./dto/create-user.dto";
import {
  EventShiftEntity,
  USER_SHIFT_STATUS,
  UserEntity,
  UserShiftEntity,
  UserShiftRequestEntity,
} from "src/entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EventShiftEntity)
    private readonly eventShiftRepository: Repository<EventShiftEntity>,
    @InjectRepository(UserShiftRequestEntity)
    private readonly userShiftRequestRepository: Repository<UserShiftRequestEntity>,
    @InjectRepository(UserShiftEntity)
    private readonly userShiftRepository: Repository<UserShiftEntity>
  ) {}
  

  //create user
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.id) {
      const user = await this.userRepository.findOne({
        where: {
          id: createUserDto.id,
        },
      });

      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.phoneNumber = createUserDto.phoneNumber;

      const newUser = this.userRepository.create(user);
      const result = await this.userRepository.save(newUser);
      return result;
    }

    delete createUserDto.id;
    const newUser = this.userRepository.create(createUserDto);

    const result = await this.userRepository.save(newUser);

    return result;
  }

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }

  // create event shift
  async createEventShift(createEventShiftDto: CreateEventShiftDto) {
    const newEventShift = this.eventShiftRepository.create(createEventShiftDto);
    const result = await this.eventShiftRepository.save(newEventShift);
    return result;
  }

  // create user request shift
  async createUserShiftRequest(
    createUserShiftRequestDto: CreateUserShiftRequestDto
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: createUserShiftRequestDto.userId,
      },
    });

    const eventShift = await this.eventShiftRepository.findOne({
      where: {
        id: createUserShiftRequestDto.eventShiftId,
      },
    });

    const newUserShiftRequest = this.userShiftRequestRepository.create({
      user,
      eventShift,
      status: USER_SHIFT_STATUS.UNSCHEDULED,
    });

    const result =
      await this.userShiftRequestRepository.save(newUserShiftRequest);
    return result;
  }

  // update request status
  async updateUserShiftRequestStatus({
    id,
    status,
  }: UpdateUserShiftRequestDto) {
    const userShiftRequest = await this.userShiftRequestRepository.findOne({
      where: {
        id,
      },
      relations: ["user", "eventShift"],
    });

    userShiftRequest.status = status;

    if (status === USER_SHIFT_STATUS.ADDED_ROASTER) {
      const userShift = this.userShiftRepository.create({
        user: userShiftRequest.user,
        eventShift: userShiftRequest.eventShift,
      });

      await this.userShiftRepository.save(userShift);
    } else if (status === USER_SHIFT_STATUS.UNSCHEDULED) {

      await this.userShiftRepository.delete({
        user: userShiftRequest.user,
        eventShift: userShiftRequest.eventShift,
      });
    }

    const result = await this.userShiftRequestRepository.save(userShiftRequest);
    return result;
  }
}
