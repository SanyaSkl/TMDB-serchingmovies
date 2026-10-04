// src/components/SearchBar/SearchBar.tsx
import {type ChangeEvent, type SyntheticEvent} from 'react';
import style from './SearchBar.module.css';

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    buttonText?: string;
    disabled?: boolean;
    className?: string;
};

export const SearchBar = ({
                              value,
                              onChange,
                              onSubmit,
                              placeholder = 'Search for a movie',
                              buttonText = 'Search',
                              disabled = false,
                              className = '',
                          }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!disabled) {
            onSubmit();
        }
    };

    const isDisabled = disabled || value.trim() === '';

    return (
        <form
            className={`${style.searchContainer} ${className}`}
            onSubmit={handleSubmit}
            role="search"
        >
            <input
                className={style.searchInput}
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <button
                className={style.searchButton}
                type="submit"
                disabled={isDisabled}
            >
                {buttonText}
            </button>
        </form>
    );
};