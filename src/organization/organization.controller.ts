import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  //   获取所有的组织
  @Get('/allorg')
  getAllOrganization() {
    return this.organizationService.getAllOrganizations();
  }
}
