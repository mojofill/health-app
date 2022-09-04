import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToOne, JoinColumn } from "typeorm";
import User from "./User.entity";

export interface UserInformationWebJson {
    personal: {
        sex: string | null; 
        height: number | null; 
        weight: number | null; 
        age: number | null; 
    }; 
    fitness: {
        dailyPushups: number | null; 
        prBenchPress: number | null; 
        dailyDistanceRan: number | null; 
    }
    diet: {
        dailyCalorieCount: number | null; 
        dailyProteinIntake: number | null; 
        dailyFatIntake: number | null; 
    }; 
    sleep: {
        averageSleepHours: number | null; 
        sleepStartTime: number | null;
        sleepEndTime: number | null; 
        sleepTemperature: number | null; 
    }
}

@Entity()
export default class UserInformation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number; 

    @OneToOne(() => User, user => user.userInformation)
    user!: User; 

    // personal
    @Column({default: ""})
    sex!: string;
    @Column({default: -1})
    height!: number;
    @Column({default: -1})
    weight!: number; 
    @Column({default: -1})
    age!: number; 

    // fitness
    @Column({default: -1})
    dailyPushups!: number; 
    @Column({default: -1})
    prBenchPress!: number; 
    @Column({default: -1})
    dailyDistanceRan!: number; 
    
    // diet
    @Column({default: -1})
    dailyCalorieCount!: number; 
    @Column({default: -1})
    dailyProteinIntake!: number; 
    @Column({default: -1})
    dailyFatIntake!: number; 

    // sleep
    @Column({default: -1})
    averageSleepHours!: number; 
    @Column({default: -1})
    sleepStartTime!: number;
    @Column({default: -1})
    sleepEndTime!: number; 
    @Column({default: -1})
    sleepTemperature!: number; 

    toWebJson(): UserInformationWebJson {
        return {
            personal: {
                sex: this.sex !== 'male' && this.sex !== 'female' ? null : this.sex, 
                height: this.height < 0 ? null : this.height, 
                weight: this.weight < 0 ? null : this.weight, 
                age: this.age < 0 ? null : this.age
            }, 
            fitness: {
                dailyPushups: this.dailyPushups < 0 ? null : this.dailyPushups, 
                prBenchPress: this.prBenchPress < 0 ? null : this.prBenchPress, 
                dailyDistanceRan: this.dailyDistanceRan < 0 ? null : this.dailyDistanceRan, 
            }, 
            diet: {
                dailyCalorieCount: this.dailyCalorieCount < 0 ? null : this.dailyCalorieCount, 
                dailyProteinIntake: this.dailyProteinIntake < 0 ? null : this.dailyProteinIntake, 
                dailyFatIntake: this.dailyFatIntake < 0 ? null : this.dailyFatIntake
            }, 
            sleep: {
                averageSleepHours: this.averageSleepHours < 0 ? null : this.averageSleepHours,
                sleepStartTime: this.sleepStartTime < 0 ? null : this.sleepStartTime, 
                sleepEndTime: this.sleepEndTime < 0 ? null : this.sleepEndTime,
                sleepTemperature: this.sleepTemperature < 0 ? null : this.sleepTemperature
            }
        }
    }
}