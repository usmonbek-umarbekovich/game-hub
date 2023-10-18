import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FormEvent, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchInputProps {
  onSearch: (searchText: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current) onSearch(ref.current.value);
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
