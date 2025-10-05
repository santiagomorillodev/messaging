import googleIcon from '../assets/googleIcon.svg'
import githubIcon from '../assets/github.svg'
import facebookIcon from '../assets/facebook.svg'
import { Input } from '../components/Input'

export function Register (){
    return (
        <section className="h-dvh w-full flex flex-col justify-center items-center gap-3.5 bg-blue-50">
                <form action='submit' className="bg-white w-full max-w-[409.5px] min-w-[200px] text-black flex flex-col justify-between p-14">
                        <h1 className="text-2xl md:text-3xl text-center">Messaging app</h1>

                        <section className='flex flex-col gap-3.5 my-3.5'>
                                <Input type='text' placeholderText='Full name'/>
                                <Input type="email" placeholderText="user@example.com"/>
                                <Input type="text" placeholderText="username"/>
                                <Input type="date" placeholderText="Birthdate"/>
                                <Input type="password" placeholderText="Password"/>
                        </section>

                        <p className="text-left text-sm">Or continue with</p>

                        <div className="flex justify-between my-3.5">
                            <div className="bg-gray-50 p-3 md:p-7 w-[91.7px] h-[46.9px] flex justify-center items-center"><img src={googleIcon} alt="google icon" width={32} height={31} /></div>
                            <div className="bg-gray-50 p-3 md:p-7 w-[91.7px] h-[46.9px] flex justify-center items-center"><img src={facebookIcon} alt="facebook icon" width={32} height={31} /></div>
                            <div className="bg-gray-50 p-3 md:p-7 w-[91.7px] h-[46.9px] flex justify-center items-center"><img src={githubIcon} alt="github icon" width={32} height={31} /></div>
                        </div>

                        <button type="submit" className="bg-[#0366FF] text-white w-full md:w-1/2 mx-auto mt-3.5  text-[0.98rem] py-3">Log in</button>
                </form>

                <section className='w-full max-w-[409.5px] bg-white flex justify-center items-center p-4'>
                        <p className='text-black text-[0.98rem]'>No tienes una cuenta? <span className='text-blue-900'>Regístrate</span></p>
                </section>

        </section>
    )
}
