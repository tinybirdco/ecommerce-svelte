import { Dropdown, DropdownItem} from '@tremor/react';

type DropDownTbFilterProps = {
  id: string;
  value: string;
}[] 

export default function DropDownTbFilter(filter: DropDownTbFilterProps, setState: Function) {
  console.log(filter)
  return (
    <Dropdown handleSelect={(value) => setState(value)}
    marginTop="mt-2"
    placeholder={"Product"}
    defaultValue={"All"}
    maxWidth='max-w-xs'>
    {Array.from(filter).map(filt =>
      <DropdownItem key={filt.id} value={filt.id} text={filt.value} />
    )
  }
  </Dropdown>
  );
}