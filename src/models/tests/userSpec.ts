import {User, user} from '../user'

describe('test user model', ()=>{
    const user_ = new User();
    it(' get all users ',async()=>{
        expect(await user_.index()).toBeDefined();
    });

    it(' create a new  user ',async()=>{
        const u:user = {
            first_name: 'maryem',
            last_name: 'ali',
            password_: 'hellopass123',
        }
        expect(await user_.create(u)).toBeDefined();
    });

    it(' get spacific  user ',async()=>{
        expect(await user_.show(1)).toBeDefined();
    });

    it(' authenticate user ',async()=>{

        const u:user = {
            id:1,
            first_name: 'maryem',
            last_name: 'ali',
            password_: 'hellopass123',
        }
        expect(await user_.authenticate(u)).toBeDefined();
    });
});