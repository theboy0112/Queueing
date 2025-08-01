import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(staffUser: string, staffPass: string) {
    const user = await this.prisma.staff.findUnique({
      where: { staffUser },
      include: { role: true },
    });

    if (user && user.staffPass === staffPass) {
      const { staffPass, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
