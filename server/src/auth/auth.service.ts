import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // Return the entire user object
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      userId: user.id // Include the user ID in the payload
    };
    return {
      access_token: this.jwtService.sign(payload),
      user // Add the user object to the response
    };
  }
}