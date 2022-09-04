import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToOne, JoinColumn } from "typeorm";
import UserInformation, {UserInformationWebJson} from "./UserInformation.entity";

export interface UserWebJson {
    username: string; 
    firstName: string; 
    lastName: string; 
    isSetUp: boolean; 
    userInformation: UserInformationWebJson; 
}

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column()
    username!: string; 

    @Column()
    password!: string; // hashed

    @Column()
    firstName!: string; 

    @Column()
    lastName!: string; 

    @Column({default: false})
    isSetUp!: boolean; 

    @OneToOne(() => UserInformation, info => info.user)
    @JoinColumn()
    userInformation!: UserInformation; 

    toWebJson(): UserWebJson {
        return {
            username: this.username, 
            firstName: this.firstName, 
            lastName: this.lastName, 
            isSetUp: this.isSetUp, 
            userInformation: this.userInformation?.toWebJson()
        }
    }
}