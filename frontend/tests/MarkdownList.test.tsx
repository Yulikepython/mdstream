import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import MarkdownList from '../src/components/MarkdownList'
import * as api from '../src/services/api'

// モックデータ
const mockListData = [
    { slug: 'terms', title: 'Terms of Service' },
    { slug: 'privacy', title: 'Privacy Policy' },
]

// fetchMarkdownList をモック化
vi.spyOn(api, 'fetchMarkdownList').mockResolvedValue(mockListData)

describe('MarkdownList Component', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    it('リストが正しく表示されること', async () => {
        render(<MarkdownList />)

        // APIコールはモックなので即座に返る
        // 非同期レンダリングを待つ
        await waitFor(() => {
            // リストアイテムがタイトルテキストを含むかを確認
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText('Terms of Service')).toBeInTheDocument()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
        })
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    it('エラー時にはエラーメッセージが表示されること', async () => {
        // fetchMarkdownList が失敗するモックを作る
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (api.fetchMarkdownList as vi.Mock).mockRejectedValueOnce(new Error('Failed'))
        render(<MarkdownList />)

        await waitFor(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText(/エラー:/)).toBeInTheDocument()
        })
    })
})
