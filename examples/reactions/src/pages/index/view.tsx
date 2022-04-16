import {View, Text, Navigator} from '@tarojs/components'

const IndexView = ({reactions}) => (
    <View className='main'>
        <View className='h2'>Static Reactions Demo</View>
        <View className='h3'>
            Reactions on{' '}
            <Navigator url='https://github.com/vercel/reactions/issues/1'>
                this GitHub issue
            </Navigator>
            :
        </View>
        <View className='line'>
            <View className='emoji'>👍 <View className='strong'>{reactions[0]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>👎 <View className='strong'>{reactions[1]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>😄 <View className='strong'>{reactions[2]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>🎉 <View className='strong'>{reactions[3]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>😕 <View className='strong'>{reactions[4]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>🧡 <View className='strong'>{reactions[5]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>🚀 <View className='strong'>{reactions[6]}</View></View>
        </View>
        <View className='line'>
            <View className='emoji'>👀 <View className='strong'>{reactions[7]}</View></View>
        </View>
        <View>
            <Text className='strong'>Explanation:</Text> This page is statically generated with{' '}
            <Navigator url='https://nextjs.org/'>Next.js</Navigator> by fetching data from
            GitHub. It's deployed to{' '}
            <Navigator url='https://vercel.com/docs/v2/edge-network/overview'>
                Vercel's Edge Network
            </Navigator>{' '}
            (CDN). Importantly, this page is being re-generated using{' '}
            <Navigator url='https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration'>
                Incremental Static Regeneration
            </Navigator>{' '}
            (released in{' '}
            <Navigator url='https://nextjs.org/blog/next-9-5'>Next.js 9.5</Navigator>). Here's
            how it works:
        </View>
        <View className='ol'>
            <View className='li'>
                <Text className='marker'>1.</Text>
                Each Next.js page can define the timeout. For this page, it's set at
                1 second.
            </View>
            <View className='li'>
                <Text className='marker'>2.</Text>
                When a new request comes in, the statically generated page is
                served.
            </View>
            <View className='li'>
                <Text className='marker'>3.</Text>
                Later, when another request comes in{' '}
                <Text className='strong'>after the defined timeout is exceeded</Text>: (1) The
                statically generated page is served, and (2){' '}
                <Text className='strong'>
                    Next.js generates a new version of the page in the background and
                    updates the static page for *future* requests
                </Text>
                .
            </View>
            <View className='li'>
                <Text className='marker'>4.</Text>
                Later, when another request comes in{' '}
                <Text className='strong'>after the regeneration is done</Text>: The updated static
                page is served.
            </View>
            <View className='li'>
                <Text className='marker'>5.</Text>
                This allows Incremental Static Regeneration on a per-page basis
                without rebuilding the full app. It'll always be fast because users
                will always get a static response.{' '}
                <Navigator url='https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration'>
                    Learn more here
                </Navigator>
                .
            </View>
            <View className='li'>
                <Text className='marker'>6.</Text>
                <Text className='strong'>Update 2022:</Text> Next.js 12.1 now allows you to also revalidate
                on-demand.{' '}
                <Navigator url='https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta'>
                    Learn more here
                </Navigator>
                .
            </View>
        </View>
        <View>
            <Text className='strong'>Source:</Text>{' '}
            <Navigator url='https://github.com/vercel/reactions/blob/master/pages/index.js'>
                pages/index.js
            </Navigator>{' '}
            - `getStaticProps()` fetches the data during static generation, and
            `revalidate` specifies the timeout.
        </View>
    </View>
);

export default IndexView
