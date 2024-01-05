"use client";
import { useEffect, useState } from "react";
import Input from "../input";
export default function AutoCompleteSelect({ label, placeholder, type, size, items, onSelect, selected }) {
  const [value, setValue] = useState({ name: "" });

  const [filteredItems, setFilteredItems] = useState([]);

  const onClick = (item) => {
    onSelect(item);
    setValue(item);
    setFilteredItems([]);
  };

  useEffect(() => {
    if (selected && items)
      items.map((item) => {
        if (item.id === selected) setValue(item);
      });
  }, [selected, items]);

  const reset = () => {
    setValue({ name: "" });
    onSelect(null);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setFilteredItems([]);
    } else {
      setFilteredItems([...items.filter((item) => item.name.includes(e.target.value))]);
    }
  };
  const onBlur = (e) => {
    // if (e.target.value === "") {
    //   setFilteredItems([]);
    // }
  };

  return (
    <div className={"autocomplete " + size}>
      <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size} onBlur={onBlur} />
      {value.name !== "" && (
        <div className="tag mla">
          <span>{value.name}</span> <i onClick={reset}>X</i>
        </div>
      )}
      {filteredItems.length > 0 && (
        <div className="dropdown">
          {filteredItems.map((item) => (
            <a key={item.id} onClick={() => onClick(item)}>
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
