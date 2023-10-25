import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FormEvent, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

import useGameQueryStore from '../store';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const setSearchText = useGameQueryStore(store => store.setSearchText);
  const ref = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (ref.current) setSearchText(ref.current.value);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
}
export default SearchInput;
