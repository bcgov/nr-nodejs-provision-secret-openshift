import { Test, TestingModule } from '@nestjs/testing'
import { vi } from 'vitest'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: { getHello: ReturnType<typeof vi.fn> }

  beforeEach(async () => {
    appService = { getHello: vi.fn() }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      appService.getHello.mockResolvedValue('Hello World!')
      expect(await appController.getHello()).toBe('Hello World!')
    })
  })
})
