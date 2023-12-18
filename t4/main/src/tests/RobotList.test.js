import { render, screen, act, fireEvent } from '@testing-library/react'
import App from '../components/App'

test('renders a robot form', () => {
	render(<App />)
	const addButton = screen.getByText('add')
	expect(addButton).not.toBeNull()
})

test('form adds an empty record', () => {
	const { container } = render(<App />)
	const addButton = screen.getByText('add')
	expect(addButton).not.toBeNull()
	act(() => {
		addButton.click()
	})
	const records = [].slice.call(container.getElementsByClassName('robot'))
	expect(records.length).toBe(3)
	const lastRecord = records.pop()
	expect(lastRecord.innerHTML).toBe('Hello, my name is . I am a  and weigh ')
})

test('form adds an full record', () => {
	const { container } = render(<App />)
	const addButton = screen.getByText('add')
	const typeInput = screen.getByPlaceholderText('type')
	fireEvent.change(typeInput, { target: { value: 'worker' }})
	const nameInput = screen.getByPlaceholderText('name')
	fireEvent.change(nameInput, { target: { value: 'bam' }})
	const massInput = screen.getByPlaceholderText('mass')
	fireEvent.change(massInput, { target: { value: 1000 }})
	expect(addButton).not.toBeNull()
	act(() => {
		addButton.click()
	})
	const records = [].slice.call(container.getElementsByClassName('robot'))
	expect(records.length).toBe(4)
	const lastRecord = records.pop()
	expect(lastRecord.innerHTML).toBe('Hello, my name is bam. I am a worker and weigh 1000')
})

test('enforces minimal weight for robots',  () => {
	const { container } = render(<App />)
	const addButton = screen.getByText('add')
	const typeInput = screen.getByPlaceholderText('type')
	fireEvent.change(typeInput, { target: { value: 'worker' }})
	const nameInput = screen.getByPlaceholderText('name')
	fireEvent.change(nameInput, { target: { value: 'zam' }})
	const massInput = screen.getByPlaceholderText('mass')
	fireEvent.change(massInput, { target: { value: 100 }})
	expect(addButton).not.toBeNull()
	act(() => {
		addButton.click()
	})
	const records = [].slice.call(container.getElementsByClassName('robot'))
	expect(records.length).toBe(5)
	const lastRecord = records.pop()
	expect(lastRecord.innerHTML).toBe('Hello, my name is zam. I am a worker and weigh ')
})
