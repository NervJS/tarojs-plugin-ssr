import { request } from "@tarojs/taro";
export { default } from "./view";

export async function getStaticProps() {
    const res = await request({
        method: "GET",
        url: "https://api.github.com/repos/NervJS/taro"
    });

    return {
        props: {
            stars: res.data.stargazers_count
        }
    };
}
