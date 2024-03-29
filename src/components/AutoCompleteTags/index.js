"use client";
import { useState, useEffect } from "react";
import Input from "../input";
export default function AutoCompleteTags({ label, placeholder, type, size, items, onSelect, selected }) {
  const [value, setValue] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  const onClick = (item) => {
    setValue([...value, item]);
  };

  const deleteTag = (tag) => {
    let v = [...value];
    let index = value.indexOf(tag);
    v.splice(index, 1);
    setValue(v);
    setFilteredItems([...filteredItems, tag]);
  };

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selected)) {
      setValue(selected);
    }
  }, [selected]);

  const onChange = (e) => {
    if (e.target.value === "") {
      setFilteredItems([]);
    } else {
      const filter = items.filter((item) => item.name.includes(e.target.value));
      let fi = [];
      filter.map((item) => {
        let exist = false;
        value.map((tag) => {
          if (tag.name === item.name) {
            exist = true;
            return true;
          }
        });
        if (!exist) {
          fi.push(item);
        }
      });
      setFilteredItems(fi);
    }
  };

  useEffect(() => {
    let fi = [];

    filteredItems.map((item) => {
      let exist = false;
      value.map((tag) => {
        if (tag.name === item.name) {
          exist = true;
          return true;
        }
      });
      if (!exist) {
        fi.push(item);
      }
    });
    setFilteredItems(fi);
    onSelect(value);
  }, [value]);

  const onBlur = (e) => {
    // if (e.target.value === "") {
    //   setFilteredItems([]);
    // }
  };

  return (
    <div className="fieldset-lg">
      <div className="tags">
        {value?.length > 0 &&
          value.map((tag) => (
            <div className="tag" key={tag.id}>
              <span>{tag.name}</span>{" "}
              <i
                onClick={() => {
                  deleteTag(tag);
                }}
              >
                X
              </i>
            </div>
          ))}
      </div>
      <div className={"autocomplete " + size}>
        <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size} onBlur={onBlur} />
        {filteredItems?.length > 0 && (
          <div className="dropdown dropdown-tags">
            <h4>Рекомендуемые навыки</h4>
            {filteredItems.map((item) => (
              <a key={item.id} onClick={() => onClick(item)}>
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
