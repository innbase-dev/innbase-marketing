import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildBlogAiOptions } from '../../src/lib/blogAi.js';

test('AI links preserve article context, punctuation and naira through URL encoding', () => {
  const post = {
    title: 'Payments & records: what does ₦1,500 mean?',
    excerpt: 'Match a payment to a sale, then check the gap.',
    takeaways: ['A screenshot is not proof of payment.'],
    aiQuestion: 'What should I check before I mark a sale paid?',
    privateField: 'must-never-be-included',
  };
  const url = 'https://innbase.co/blog/payment-records';
  const options = buildBlogAiOptions(post, url);
  assert.deepEqual(options.map(option => option.id), ['explain', 'checklist', 'plan']);
  for (const option of options) {
    const href = new URL(option.href);
    assert.equal(href.origin, 'https://chatgpt.com');
    const prompt = href.searchParams.get('q');
    for (const text of [post.title, post.excerpt, post.takeaways[0], post.aiQuestion, url]) {
      assert.ok(prompt.includes(text));
    }
    assert.ok(prompt.includes('If you cannot open the article, say so'));
    assert.ok(!prompt.includes(post.privateField));
  }
});
