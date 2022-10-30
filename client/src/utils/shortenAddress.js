export const shortenAddress = (address) => {
    if (
        typeof address !== 'string' ||
        address.length < 10
    ) return '';

    return address.substring(0, 4) + '...'+ address.substring(address.length - 3);
};
