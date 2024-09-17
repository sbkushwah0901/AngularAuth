import { environment } from 'src/environments/environment';

const basePath = environment.BASE_URL;

export const APIConstant = {
 //Admin
 getAdminLogin : `${basePath}/admin/AdminLogin/{mobileNumber}`,
 getVerifyAdmin: `${basePath}/admin/VerifyAdmin/{mobileNumber}/{otp}`,
 getAllCount : `${basePath}/admin/GetAllCount`,
 GetAllUsers : `${basePath}/admin/GetAllUsers`,
 postGetUserByDate : `${basePath}/admin/GetUserByDate`,
 postBlockUser: `${basePath}/admin/BlockUser`,
 postCreateUser : `${basePath}/admin/CreateUser`,
 postUpdateSpaceConfig : `${basePath}/admin/UpdateSpaceConfig`,
 getGetSpaceConfiguration : `${basePath}/admin/GetSpaceConfiguration`,
 
}