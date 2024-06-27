import { Injectable } from '@nestjs/common';
import { Organization } from '@/entities/organization/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private oranizationRepository: Repository<Organization>,
  ) {}
  getAllOrganizations(): Promise<Organization[]> {
    return this.oranizationRepository.find();
  }
}
