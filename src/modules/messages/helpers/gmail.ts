export class Gmail {
  secretToken: string;
  appToken: string;
  emailsSent: Array<{
    content: string;
    to: string;
    from: string;
  }>;
  connected: boolean;

  constructor(params: { secretToken: any; appToken: any }) {
    this.secretToken = params.secretToken;
    this.appToken = params.appToken;
    this.emailsSent = [];
    this.connected = false;
  }

  async init() {
    this.connected = true;
  }

  async sendEmail(content: string, to: string, from: string): Promise<boolean> {
    this.emailsSent.push({
      content,
      to,
      from,
    });
    return true;
  }
}
