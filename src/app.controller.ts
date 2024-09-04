/* eslint-disable prettier/prettier */
// import {
//   Controller,
//   Get,
//   Param,
//   Post,
//   Body,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { UserService } from './users/users.service';
// import { PostService } from './post.service';
// import { user as UserModel, Post as PostModel } from '@prisma/client';

// @Controller()
// export class AppController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly postService: PostService,
//   ) {}

//   @Get('post/:id')
//   async getPostById(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.post({ id: Number(id) });
//   }

//   @Get('feed')
//   async getPublishedPosts(): Promise<PostModel[]> {
//     return this.postService.posts({
//       where: { published: true },
//     });
//   }

//   @Get('filtered-posts/:searchString')
//   async getFilteredPosts(
//     @Param('searchString') searchString: string,
//   ): Promise<PostModel[]> {
//     return this.postService.posts({
//       where: {
//         OR: [
//           {
//             title: { contains: searchString },
//           },
//           {
//             content: { contains: searchString },
//           },
//         ],
//       },
//     });
// }

//   @Post('post')
//   async createDraft(
//     @Body() postData: { title: string; content?: string; authorEmail: string },
//   ): Promise<PostModel> {
//     const { title, content, authorEmail } = postData;
//     return this.postService.createPost({
//       title,
//       content,
//       author: {
//         connect: { email: authorEmail },
//       },
//     });
//   }

//   @Post('user')
//   async signupUser(
//     @Body() userData: { name: string; email: string; phone_number: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }

//   @Put('publish/:id')
//   async publishPost(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.updatePost({
//       where: { id: Number(id) },
//       data: { published: true },
//     });
//   }

//   @Delete('post/:id')
//   async deletePost(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.deletePost({ id: Number(id) });
//   }
// }
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  async healthCheck() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return { status: 'ok', message: 'Database connection is healthy' };
    } catch (error) {
      console.error('Database connection error:', error);
      return { status: 'error', message: 'Database connection failed' };
    }
  }
}
