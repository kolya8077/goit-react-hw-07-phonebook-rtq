import { Ul, Span, Item } from 'components/ContactList/contactList.styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import {
  useGetContactsQuery,
  useDeleteContactsMutation,
} from 'redux/operations';

export const ContactList = () => {
  const filterValue = useSelector(getFilter);

  const { data } = useGetContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactsMutation();

  const getVisibleList = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return data?.filter(list =>
      list.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleList = getVisibleList();

  return (
    <>
      {data && (
        <Ul>
          {visibleList.map(({ name, number, id }) => (
            <Item key={id}>
              <Span>
                {name}: {number}
              </Span>
              <button
                type="button"
                onClick={() => {
                  deleteContact(id);
                }}
                disabled={isLoading}
              >
                delete
              </button>
            </Item>
          ))}
        </Ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
