// Backend (NestJS) - JwtStrategy
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('Decoded Payload:', payload);
    if (!payload || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userService.findOneByEmail(payload.email); // Fetch by userId
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user; // Return the complete user object
  }
}