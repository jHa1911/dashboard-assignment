interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (
        value: string
    ) => void;
}

function SearchBar({
    searchTerm,
    setSearchTerm,
}: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(
                    e.target.value
                )
            }
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
            }}
        />
    );
}

export default SearchBar;