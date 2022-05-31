import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

interface NodeType {
    type?: 'node' | 'text'
    [key: string]: any
}

type NodesType = string | NodeType[]

export interface RichTextProps extends BaseProps {
    /**
     * 节点列表/ HTML String
     */
    nodes?: NodesType

    /**
     * 富文本是否可以长按选中，可用于复制，粘贴，长按搜索等场景
     */
    selectable?: boolean
}

// https://html.spec.whatwg.org/multipage/syntax.html#void-elements
const VOID_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'source',
    'track',
    'wbr'
]

function renderNodes(nodes?: NodesType): string {
    if (!nodes) {
        return ''
    }

    if (typeof nodes === 'string') {
        return nodes
    }

    return nodes.reduce((result, node) => {
        if (node.type === 'text') {
            result += node.text
        } else if (node.name) {
            result = `<${node.name}`
            if (node.attrs) {
                for (const key in node.attrs) {
                    result += ` ${key}="${node.attrs[key]}"`
                }
            }
            result += '>'
            if (!VOID_ELEMENTS.includes(node.name)) {
                if (node.children) {
                    result += renderNodes(node.children)
                }
                result += `</${node.name}>`
            }
        }
        return result
    }, '')
}

const RichText: React.ForwardRefRenderFunction<HTMLDivElement, RichTextProps> = ({
    id,
    style,
    className,
    nodes,
    selectable,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    return (
        <div
            ref={ref}
            id={id}
            style={style}
            className={classNames(className, {
                'taro-rich-text__selectable': selectable
            })}
            dangerouslySetInnerHTML={{
                __html: renderNodes(nodes)
            }}
            {...handles}
        />
    )
}

export default forwardRef(RichText)
