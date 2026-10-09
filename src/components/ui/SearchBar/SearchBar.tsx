import {type ChangeEvent, type SyntheticEvent, useState} from 'react';
import style from './SearchBar.module.css';
import {searchQuerySchema} from "@/validations";

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
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = searchQuerySchema.safeParse(value);
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError(null);
        onSubmit();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        onChange(e.target.value);
    };

    const isButtonDisabled = disabled || value.trim().length === 0;

    return (
        <form
            className={`${style.searchContainer} ${className}`}
            onSubmit={handleSubmit}
            role="search"
        >
            <input
                className={`${style.searchInput} ${error ? style.searchInputError : ''}`}
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                aria-invalid={!!error}
                aria-describedby={error ? 'search-error' : undefined}
            />
            <button
                className={style.searchButton}
                type="submit"
                disabled={isButtonDisabled}
            >
                {buttonText}
            </button>
            {error && (
                <p id="search-error" className={style.errorMessage}>
                    {error}
                </p>
            )}
        </form>
    );
};