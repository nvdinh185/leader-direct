/**
 * Nội dung bảng pipe này sẽ chuyển đổi các mã #id sẽ liên kết với ý tưởng có số id đó
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linkUrl'
})
export class LinkUrlPipe implements PipeTransform {
    transform(content: string): string {
        return !content ? '' : content.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, (url) => `<a href="${url}" target="_blank">${(url.length > 30 ? "Link#" : url)}</a>`)
    }
}