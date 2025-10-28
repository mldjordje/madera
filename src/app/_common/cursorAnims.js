export const CursorAnimation = () => {
    const cursor = document.querySelector('.sb-click-effect');

    document.addEventListener('mousemove', (e) => {
        cursor.setAttribute('style', "top:" + (e.pageY - 15) + "px; left:" + (e.pageX - 15) + "px;");
    });
    document.addEventListener('click', () => {
        cursor.classList.add('sb-click');

        setTimeout(() => {
            cursor.classList.remove('sb-click');
        }, 600);
    });
}