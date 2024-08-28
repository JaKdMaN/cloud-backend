import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Observable } from 'rxjs'

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
  private interceptor

  constructor () {
    const uploadFileInterceptor = FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const originalName = Buffer.from(file.originalname, 'latin1').toString('utf-8')
          const [ name, extenstion ] = originalName.split('.')
          const newFileName = `${name.split(' ').join('-')}_${Date.now()}.${extenstion}`
  
          callback(null, newFileName)
        },
      }),
    })

    this.interceptor = new uploadFileInterceptor()
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return this.interceptor.intercept(context, next)
  }
}