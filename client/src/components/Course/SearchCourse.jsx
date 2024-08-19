import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaArrowRight, FaSearch, FaSpinner } from "react-icons/fa";
import debounce from "lodash/debounce";
import CourseService from "../../services/Course.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../../redux/features/resetStateSlice";

function SearchCourse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  const dispatch = useDispatch();

  const fetchSuggestions = async (value) => {
    if (value.trim() === "") {
      setSuggestions([]);
      setIsLoading(false);
      setNoResults(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await CourseService.autoComplete(value);
      if (response.error) {
        setNoResults(true);
      } else {
        setSuggestions(response.data);
        setNoResults(response.data && response.data.length === 0);
      }
    } catch (error) {
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputFocused) {
      CourseService.autoComplete("").then((response) => {
        if (response.error) {
          setNoResults(true);
        } else if (response.data) {
          setSuggestions(response.data || []);
          setNoResults(response.data.length === 0);
        }
      });
    }
  }, [inputFocused]);

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setInputFocused(!inputFocused);
    debouncedFetchSuggestions(value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    setSuggestions([]); // Clear suggestions
    setInputFocused(false); // Hide suggestions
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
  };

  const handleClickOutside = (event) => {
    setInputFocused(false);
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(resetState());
      handleSearch();
      setInputFocused(false);
    }
  };

  const highlightText = (text, highlight) => {
    if (!text) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 rounded-sm ">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="flex items-center space-x-2 w-[500px]">
        <div className="relative w-full" ref={suggestionsRef}>
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="border-2 border-spacing-2 rounded-full px-4 py-2 w-full pr-9"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setInputFocused(true)}
            onKeyDown={handleKeyDown}
            style={{ paddingRight: "30px" }}
          />{" "}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 rounded-full p-2 text-black"
            onClick={handleSearch}
          >
            <FaSearch className="text-xl " />
          </button>
          {noResults && !isLoading && (
            <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 text-gray-500">
                  {suggestions.length === 0
                    ? "Not Found"
                    : "Error loading data"}
                </li>
              </ul>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg overflow-y-auto h-[300px] z-50">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(suggestion.Phrase);
                      setSuggestions([]);
                      navigate(
                        `/search/${encodeURIComponent(suggestion.Phrase)}`
                      );
                    }}
                  >
                    {/* <p>{highlightText(suggestion.Phrase, searchTerm)} </p> */}
                    {suggestion.Phrase === null ? (
                      <p>Not Found</p>
                    ) : (
                      <p>{highlightText(suggestion.Phrase, searchTerm)} </p>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchCourse;
