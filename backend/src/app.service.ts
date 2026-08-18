import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PROJECT_NAME, SERVICE_NAME, BROKER_URL } from './constants'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async getHello(): Promise<string> {
    const apitoken = this.configService.get<string>('apitoken')
    const username = this.configService.get<string>('username')
    const password = this.configService.get<string>('password')
    const environment = this.configService.get<string>('environment')
    let packageVersion = 'unknown'
    let transactionStart = 'unknown'
    let transactionEnd = 'unknown'
    let eventUrl = 'unknown'
    try {
      const where = {
        'actions.action': 'package-installation',
        'actions.service.project': PROJECT_NAME,
        'actions.service.name': SERVICE_NAME,
        'actions.service.environment': environment,
      }
      const params = new URLSearchParams({
        where: JSON.stringify(where),
        offset: '0',
        limit: '1',
      })

      const requestUrl = `${BROKER_URL}/v1/intention/search?${params.toString()}`
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${apitoken}`,
        },
      })
      const responseJson = (await response.json()) as {
        data?: Array<{
          actions?: Array<{ action?: string; package?: { version?: string } }>
          transaction?: { start?: string; end?: string }
          event?: { url?: string }
        }>
      }
      console.log('Broker response:', responseJson)
      const data = responseJson.data?.[0]
      if (data) {
        // Find the package-installation action
        const pkgInstallAction = data.actions?.find((a) => a.action === 'package-installation')
        if (pkgInstallAction) {
          packageVersion = pkgInstallAction.package?.version ?? 'unknown'
        }
        // Transaction times
        if (data.transaction?.start && data.transaction?.end) {
          // Convert to local time string
          transactionStart = new Date(data.transaction.start).toLocaleString()
          transactionEnd = new Date(data.transaction.end).toLocaleString()
        }
        // Event URL
        eventUrl = data.event?.url ?? 'unknown'
      }
    } catch {
      // handle error or log
    }

    return `
      project: ${PROJECT_NAME},
      service: ${SERVICE_NAME},
      environment: ${environment},
      packageVersion: ${packageVersion},
      transactionStart: ${transactionStart},
      transactionEnd: ${transactionEnd},
      eventUrl: ${eventUrl},
      username: ${username},
      password: ${password}
    `
  }
}
