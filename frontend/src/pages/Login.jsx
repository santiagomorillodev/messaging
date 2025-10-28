import googleIcon from '../assets/googleIcon.svg'
import githubIcon from '../assets/github.svg'
import facebookIcon from '../assets/facebook.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export function Login () {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	console.log(username, password)

	async function handleSubmit (e) {
		e.preventDefault()

		const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			credentials: 'include',
			body: new URLSearchParams({username, password}),
		})

		if (response.ok) {
			const data = await response.json();
			navigate('/inbox')
		} else{
			console.error('Login failed')
		}
	}
	return (
		<section className="h-dvh flex flex-col justify-center items-center gap-5 bg-blue-50">
			<form onSubmit={handleSubmit} className="bg-white w-[410px] h-[483px] text-black flex flex-col justify-between p-14">
				<h1 className="text-xl text-left">Welcome to this messaging app</h1>
				<p className="text-gray-400 text-left">Choose one of the option to go</p>

				<input id='username' type="text" placeholder="user@example.com" className="w-[308px] h-[48px] border-[0.1px] border-gray-300 rounded-md pl-3 outline-0" value={username} onChange={e => setUsername(e.target.value)} />
				<input id='password' type="password" placeholder="Password" className="w-[308px] h-[48px] border-[0.1px] border-gray-300 rounded-md pl-3 outline-0" value={password} onChange={e => setPassword(e.target.value)} />

				<p className="text-left">Or continue with</p>

				<div className="flex justify-between">
					<div className="bg-gray-50 p-7 w-[92px] h-[47px] flex justify-center items-center">
						<img src={googleIcon} alt="google icon" width={32} height={32} />
					</div>
					<div className="bg-gray-50 p-7 w-[92px] h-[47px] flex justify-center items-center">
						<img src={facebookIcon} alt="facebook icon" width={32} height={32} />
					</div>
					<div className="bg-gray-50 p-7 w-[92px] h-[47px] flex justify-center items-center">
						<img src={githubIcon} alt="github icon" width={32} height={32} />
					</div>
				</div>

				<button type="submit" className="bg-[#0366FF] text-white w-[218px] h-[43px] mx-auto">Log in</button>
			</form>

			<section className='w-[410px] h-14 bg-white flex justify-center items-center'>
				<p className='text-black'>No tienes una cuenta? <span className='text-blue-900'>Regístrate</span></p>
			</section>
		</section>
	)
}
