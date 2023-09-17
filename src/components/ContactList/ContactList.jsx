import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';

import { List, Item, Button } from "./ContactList.styled";

const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const filter = useSelector(selectFilter);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);
// console.log(contacts);
// const visibleContacts = contacts ? Object.values(contacts) : [];

	const visibleContacts = contacts.filter(({ name }) =>
		name.toLowerCase().includes(filter)
	);

	return (
		<>
		{isLoading ? (
			<Loader />
		) : (
		<List>
			{visibleContacts.length !== 0 ? (
				visibleContacts.map(({ id, name, number }) => {
					return (
						<Item key={id}>
							<p>{name} - {number}</p>
							<Button
								type="button"
								onClick={() => dispatch(deleteContact(id))}>Delete
							</Button>
						</Item>

					)
				})
			) : error ? (
            <p>{error}</p>
          ) : (
            <p>There are no contacts :(</p>
          )}
		  </List>
			)}
		</>
	);
};

export default ContactList;