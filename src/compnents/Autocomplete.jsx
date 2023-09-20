import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

export default function MultipleDemo() {
  const [countries] = useState([
    { name: "United Kingdom", code: "UK" },
    { name: "United States", code: "USA" },
  ]);
  const [value, setValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [dropdownOpen, setDopDownOpen] = useState(false);
  const search = (event) => {
    // Timeout to emulate a network connection
    console.log(event);
    setValue(event);
    if (
      event === "*" ||
      event === "/" ||
      event === "(" ||
      event === ")" ||
      event === "-" ||
      event === "+"
    ) {
      setSelectedCountries([
        ...selectedCountries,
        {
          name: event,
          type: "operation",
        },
      ]);
      setValue("");
    }
    if (event === "" && !selectedCountries.length !== 0) {
      let arr = [...selectedCountries];
      arr.pop();
      setSelectedCountries(arr);
    }
    setTimeout(() => {
      let _filteredCountries;

      if (!event.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name.toLowerCase().startsWith(event.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
      if (_filteredCountries.length === 0) {
        setDopDownOpen(false);
      } else {
        setDopDownOpen(true);
      }
    }, 250);
  };
  console.log(selectedCountries);
  const handelDelete = (index) => {
    let array = [...selectedCountries];
    console.log("this is handel delte", array);
    array.splice(index, 1);
    console.log([...array]);
    setSelectedCountries(array);
  };
  return (
    <div className="mx-auto p-4 mt-4">
      <div>
        <Dropdown isOpen={dropdownOpen} toggle={() => setDopDownOpen(false)}>
          <DropdownToggle
            style={{
              background: "none",
            }}
          >
            <div className="d-flex gap-2 align-items-center">
              {selectedCountries?.map((item, key) =>
                item?.type === "operation" ? (
                  <p key={key} className="m-0 text-black">
                    {item.name}
                  </p>
                ) : (
                  <Badge key={key}>
                    <div className="d-flex align-items-center gap-2 justify-content-between">
                      <p className="m-0">{item.name}</p>
                      <Button size="sm" onClick={() => handelDelete(key)}>
                        X
                      </Button>
                    </div>
                  </Badge>
                ),
              )}
              <input
                value={value}
                style={{
                  padding: "0",
                  border: "0",
                  outline: "none",
                }}
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </DropdownToggle>

          <DropdownMenu>
            {filteredCountries?.map((item, key) => (
              <DropdownItem
                onClick={() => {
                  let arr = [...selectedCountries];
                  arr.push(item);
                  setSelectedCountries(arr);
                  setDopDownOpen(false);
                  setValue("");
                }}
                key={key}
              >
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
