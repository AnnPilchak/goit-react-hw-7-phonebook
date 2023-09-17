import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { Form, Label, Input } from "./ContactForm.styled"

import { nanoid } from 'nanoid';

const ContactForm = () => {
	const nameId = nanoid();
	const numberId = nanoid();

	const contacts = useSelector(selectContacts);
	const dispatch = useDispatch();
	
	const handleSubmit = e => {
    	e.preventDefault();

    	const form = e.target;
    	const isInContacts = contacts.find(
      	({ name }) => name.toLowerCase() === form.name.value.toLowerCase()
    	);
    	if (isInContacts) return alert(`${form.name.value} is already in contacts`);

    	dispatch(
		addContact({
			id: nanoid(),
			name: form.name.value,
			number: form.number.value,
		})
		);

		e.target.reset();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Label htmlFor={nameId}>
				Name
				<Input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					id={nameId}
				/>
			</Label>
			<Label htmlFor={numberId}>
				Number
				<Input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					id={numberId}
				/>
			</Label>
			<button type="submit">Add contact</button>
		</Form>
	);
};

export default ContactForm;