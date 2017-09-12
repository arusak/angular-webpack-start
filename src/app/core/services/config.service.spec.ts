import {ConfigService} from "./config.service";
let configService: ConfigService;


describe('ConfigService', () => {
  beforeEach(() => {
    configService = new ConfigService();
  });

  it('should give meaningful App Title', () => {
    expect(configService.getAppTitle()).toBeTruthy();
  })
});
