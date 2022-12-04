import { Controller,
    Get, Post, Patch, 
    Param, Query, Body,
    Request
 } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ComplaintDto } from './dtos/complaint.dto';
import { RequestProperty } from 'src/auth/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesUser } from 'src/enums/roles.enum';

@Controller('complaints')
export class ComplaintsController {

    constructor(private complaintsService: ComplaintsService) {}

    @Get('/admin')
    @Roles(RolesUser.Admin)
    getComplaintsByStatus(@Query('status') status: string) {
        return this.complaintsService.findComplaintsByStatus(status);
    }

    @Get()
    @Roles(RolesUser.Client)
    getComplaints(@Request() req) {
        const user = req.user as RequestProperty;
        return this.complaintsService.findComplaints(user);
    }

    @Serialize(ComplaintDto)
    @Get('/:id')
    @Roles(RolesUser.Client)
    getComplaint(@Param('id') id: string) {
        return this.complaintsService.findComplaintById(id);
    }

    @Serialize(ComplaintDto)
    @Post()
    @Roles(RolesUser.Client)
    postComplaint(@Body() body: CreateComplaintDto, @Request() req) {
        const user =  req.user as RequestProperty;
        return this.complaintsService.create(body, user);
    }

    @Serialize(ComplaintDto)
    @Patch('/:id')
    @Roles(RolesUser.Admin)
    updateStatusById(@Param('id') id: string, @Body() body: UpdateStatusDto) {
        return this.complaintsService.updateComplaintStatusById(id, body.status);
    }
    
}
